import { useId } from "react";
import { ButtonWithAlert } from "~/components/ButtonWithAlert";
import { Window, WindowProps } from "~/components/Window";
import { TourneySpecificationWithId } from "~/types/tourney";
import { SpecificationForm, SpecificationFormSchema } from "./SpecificationForm";

type Props = {
  specification: TourneySpecificationWithId;
  onSubmit?: (specification: TourneySpecificationWithId) => void;
  onRemove?: () => void;
};

export const EditSpecificationWindow = ({
  specification,
  onSubmit,
  onRemove,
  ...props
}: WindowProps<Props>) => {
  const formId = useId();

  const defaultValue = {
    title: specification.title,
    businessDescription: specification.businessDescription,
    techDescription: specification.techDescription,
  };

  const handleSubmit = (data: SpecificationFormSchema) => {
    onSubmit?.({
      ...specification,
      title: data.title,
      businessDescription: data.businessDescription,
      techDescription: data.techDescription,
      order: specification.order,
    });
    props.onClose();
  };

  return (
    <Window
      {...props}
      heading="Редактирование сценария"
      contentProps={{ w: "800px" }}
      submitProps={{ type: "submit", form: formId }}
      extraButton={
        <ButtonWithAlert
          colorScheme="red"
          onSubmit={onRemove}
          buttonText="Удалить сценарий"
          alertText="Вы уверены, что хотите удалить данный сценарий?"
        />
      }
    >
      <SpecificationForm
        id={formId}
        defaultValue={defaultValue}
        onSubmit={handleSubmit}
      />
    </Window>
  );
};
