export interface Route {
  id: string;
  name: string;
  costs?: number;
  opened: boolean;
  active: boolean;
  date: [number, number];
  route: RouteSection[];
}

export interface RouteSectionPrice {
  price?: string;
}

export interface RouteSectionLocationEntity {
  city: string;
  country: string;
}

export interface RouteSectionLocation {
  from: RouteSectionLocationEntity;
  to: RouteSectionLocationEntity;
}

export interface RouteSectionTransport extends RouteSectionPrice {
  departure: string;
  arrival: string;
}

export interface RouteSectionHabitation extends RouteSectionPrice {
  address?: string;
}

export interface RouteSection {
  id: string;
  location: RouteSectionLocation;
  transport?: RouteSectionTransport;
  habitation?: RouteSectionHabitation;
}
