export class APIUrls {
    private static readonly BASE: string = 'localhost';

    public static USER = class {
        public static readonly LOGIN: string = APIUrls.BASE + '/login';
        public static readonly REGISTER: string = APIUrls.BASE + '/register';
    }
}