import { ref } from "vue";

export default function useLogin() {

    const loading = ref(false);

    const login = async (data: any) => {

        loading.value = true;

        try {

            const response = await api.post(
                "/auth/login",
                data
            );

        }

}