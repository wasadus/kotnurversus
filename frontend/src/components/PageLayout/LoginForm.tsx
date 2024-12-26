import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginFormSchema } from "~/utils/auth-schemas.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@chakra-ui/react";
import { Input } from "~/components/Input.tsx";
import { PasswordInput } from "~/components/PasswordInput.tsx";
import { AuthFormProps } from "~/components/PageLayout/AuthFormProps.ts";

export const LoginForm = ({ id, onSubmit }: AuthFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
    });

    return (
        <Stack
            as="form"
            id={id}
            spacing={4}
            onSubmit={handleSubmit((data) => onSubmit(data.login, data.password))}
        >
            <Input
                {...register("login")}
                size="lg"
                label="Имя пользователя"
                placeholder="Логин"
                errorMessage={errors.login?.message}
            />
            <PasswordInput
                {...register("password")}
                size="lg"
                label="Пароль"
                placeholder="Пароль"
                errorMessage={errors.password?.message}
            />
        </Stack>
    );
};