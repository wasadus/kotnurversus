import {FormLabel, Radio, RadioGroup, Stack, Switch} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "~/components/Input";
import { Textarea } from "~/components/Textarea";
import { SelectCategory } from "./SelectCategory";

type Props = {
  id: string;
  defaultValue?: Partial<ChallengeFormSchema>;
  onSubmit: (data: ChallengeFormSchema) => void;
};

export const ChallengeForm = ({ id, defaultValue, onSubmit }: Props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChallengeFormSchema>({
    defaultValues: defaultValue,
    resolver: zodResolver(challengeFormSchema),
  });

  return (
    <Stack id={id} as="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="categoryId"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectCategory {...field} errorMessage={error?.message} />
        )}
      />
      <Input
        {...register("title")}
        label="Название"
        errorMessage={errors.title?.message}
      />
      <Textarea
        {...register("shortDescription")}
        minH="64px"
        label="Краткое описание"
      />
      <Textarea {...register("description")} minH="160px" label="Описание" />
      <div>
        <FormLabel id="difficulty-label">Сложность</FormLabel>
        <Controller
          name="difficulty"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <RadioGroup
              {...field}
              value={field.value}
              aria-labelledby="difficulty-label"
              aria-errormessage={error?.message}
            >
              <Stack direction="row">
                <Radio value="easy">Лёгкая</Radio>
                <Radio value="medium">Средняя</Radio>
                <Radio value="hard">Сложная</Radio>
              </Stack>
            </RadioGroup>
          )}
        />
      </div>
      <Switch
        {...register("isCatInBag")}
        my={2}
        w="fit-content"
        colorScheme="teal"
        display="flex"
        alignItems="center"
        children="Может быть котом в мешке"
      />
    </Stack>
  );
};

const challengeFormSchema = z.object({
  categoryId: z.string({
    invalid_type_error: "Заполните поле",
    required_error: "Заполните поле",
  }),
  title: z
    .string()
    .min(1, "Заполните поле")
    .max(50, "Максимальная длина 50 символов"),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  difficulty: z.string().default("unknown"),
  isCatInBag: z.boolean().default(false),
});

export type ChallengeFormSchema = z.infer<typeof challengeFormSchema>;