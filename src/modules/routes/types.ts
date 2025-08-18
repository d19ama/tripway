export type RouteStatus = 'new' | 'completed' | 'edit';

export interface Route {
  id: string;
  name: string;
  date: string[];
  costs?: number;
  opened: boolean;
  active: boolean;
  status: RouteStatus;
  route: RouteSection[];
}

export type RouteSectionTransportType = 'airplane' | 'train' | 'bus' | 'car' | 'bicycle' | 'other';

export interface RouteSectionPrice {
  price?: string;
}

export interface RouteSectionLocation {
  city: string;
  country: string;
}

export interface RouteSectionTransport extends RouteSectionPrice {
  departure: string;
  arrival: string;
  type: RouteSectionTransportType;
}

export interface RouteSectionHabitation extends RouteSectionPrice {
  address?: string;
}

export interface RouteSection {
  id: string;
  location: RouteSectionLocation;
  transport: RouteSectionTransport;
  habitation: RouteSectionHabitation;
}
