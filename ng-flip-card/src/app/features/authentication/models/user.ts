export interface FirebaseUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
  providerId?: string;
}

export class User implements FirebaseUser {
  constructor(
    public uid: string,
    public displayName: string | null,
    public email: string | null,
    public phoneNumber: string | null = '',
    public photoURL: string | null = ''
  ) {}
}
