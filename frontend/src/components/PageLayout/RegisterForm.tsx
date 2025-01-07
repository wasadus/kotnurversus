import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerFormSchema, passwordRequirements } from "~/utils/auth-schemas.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@chakra-ui/react";
import { Input } from "~/components/Input.tsx";
import { PasswordInput } from "~/components/PasswordInput.tsx";
import { AuthFormProps } from "~/components/PageLayout/AuthFormProps.ts";

export const RegisterForm = ({ id, onSubmit }: AuthFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
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
                requirements={passwordRequirements}
                errorMessage={errors.password?.message}
            />
            <PasswordInput
                {...register("confirmPassword")}
                size="lg"
                label="Повторите пароль"
                placeholder="Пароль"
                errorMessage={errors.confirmPassword?.message}
            />
        </Stack>
    );
};