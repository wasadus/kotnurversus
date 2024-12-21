import { Window, WindowProps } from "~/components/Window.tsx";
import { useCustomToast } from "~/hooks/useCustomToast.ts";
import { useAuthContext } from "~/utils/auth-context.tsx";
import { Button, useBoolean } from "@chakra-ui/react";
import { useId } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthRequest } from "~/types/auth.ts";
import { api } from "~/api";
import { LoginForm } from "~/components/PageLayout/LoginForm.tsx";
import { RegisterForm } from "~/components/PageLayout/RegisterForm.tsx";

export const AuthWindow = (props: WindowProps) => {
    const toast = useCustomToast();
    const { onLogin } = useAuthContext();
    const [isRegistration, setIsRegistration] = useBoolean(false);
    const formId = useId();

    const auth = useMutation({
        mutationFn: async (data: AuthRequest) => {
            return await (isRegistration ? api.auth.register : api.auth.login)(data);
        },
        onSuccess: (response) => {
            if (response.user.isAuthorized === false) {
                toast.warning({
                    duration: 10000,
                    containerStyle: { whiteSpace: "pre-line" },
                    description: [
                        "Требуется подтверждение аккаунта.",
                        "Обратитесь к администрации сервиса.",
                    ].join("\n"),
                });
            } else {
                toast.success({ description: "Авторизация прошла успешно" });
                onLogin(response.token);
            }
            props.onClose();
        },
        onError: () => {
            toast.error({
                description: isRegistration
                    ? "Пользователь с таким логином уже существует"
                    : "Неверный логин или пароль",
            });
        },
    });

    const Form = isRegistration ? RegisterForm : LoginForm;

    return (
        <Window
            isHideCancel
            isLoading={auth.isPending}
            heading={isRegistration ? "Регистрация" : "Вход в аккаунт"}
            contentProps={{ w: "450px" }}
            submitProps={{
                type: "submit",
                form: formId,
                children: isRegistration ? "Зарегистрироваться" : "Войти",
            }}
            extraButton={
                <Button
                    variant="link"
                    colorScheme="blue"
                    isDisabled={auth.isPending}
                    onClick={setIsRegistration.toggle}
                    children={isRegistration ? "Вход" : "Регистрация"}
                />
            }
            children={
                <Form
                    id={formId}
                    onSubmit={(email, password) => auth.mutateAsync({ email, password })}
                />
            }
            {...props}
        />
    );
};
