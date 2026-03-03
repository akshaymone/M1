import { supabase } from '../../../shared/services/supabase';
import { Profile, UserLocation } from '../../../types';

export const locationService = {
  async updateMyLocation(userId: string, latitude: number, longitude: number, accuracy: number) {
    const { error } = await supabase
      .from('user_locations')
      .upsert({
        user_id: userId,
        latitude,
        longitude,
        accuracy,
        updated_at: new Date().toISOString(),
      });
    
    if (error) {
      console.error('Error updating my location:', error);
    }
  },

  async getUserLocation(userId: string): Promise<UserLocation | null> {
    const { data, error } = await supabase
      .from('user_locations')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user location:', error);
      return null;
    }
    
    return data;
  },

  async getAllUserLocations(): Promise<UserLocation[]> {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('user_locations')
      .select('*')
      .neq('user_id', user?.id || '');
    
    if (error) {
      console.error('Error fetching all user locations:', error);
      return [];
    }

    return data as UserLocation[];
  },

  subscribeToAllUserLocations(callback: (payload: any) => void) {
    return supabase
      .channel('all_user_locations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_locations',
        },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe();
  },

  async getAllProfiles(): Promise<Profile[]> {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, updated_at')
      .neq('id', user?.id || '');
    
    if (error) {
      console.error('Error fetching profiles:', error);
      return [];
    }

    return data.map(profile => ({
      id: profile.id,
      full_name: profile.full_name || 'Unknown',
      avatar_url: profile.avatar_url || '',
      last_seen: profile.updated_at || '',
    }));
  },

  subscribeToUserLocation(userId: string, callback: (location: UserLocation) => void) {
    return supabase
      .channel(`user_location:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_locations',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new as UserLocation);
        }
      )
      .subscribe();
  },
};
