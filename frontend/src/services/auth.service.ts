import AuthRepository from "@/repositories/auth.repository";

export class AuthService {

    static async login(
        data: LoginRequest
    ) {

        const response =
            await AuthRepository.login(
                data
            );

        authStore.login(
            response
        );

        return response;
    }

}