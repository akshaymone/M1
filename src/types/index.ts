export type AuthStackParamList = {
  Login: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Map: { userId?: string };
};

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  App: undefined;
};

export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  last_seen: string;
}

export interface UserLocation {
  user_id: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  updated_at: string;
}
