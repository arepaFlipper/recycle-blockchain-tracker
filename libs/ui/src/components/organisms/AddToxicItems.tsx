import { FormTypeCreateProduct } from "@recycle-chain/forms/src/createProduct";
import { useFieldArray, useFormContext } from "react-hook-form";
import { HtmlInput } from "../atoms/HtmlInput";
import { Button } from "../atoms/Button";

type AddToxicItemsProps = {
  className?: string
}


const AddToxicItems = ({ className }: AddToxicItemsProps) => {
  const { control, register } = useFormContext<FormTypeCreateProduct>();
  const { fields, append, remove } = useFieldArray({ control, name: 'toxicItems' });

  return (
    <div className={className}>
      <h3 className="font-semibold">Toxic Items</h3>
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <div className="grid grid-cols-2 gap-2">
              <HtmlInput className="bg-[#181825] text-white border-white focus:border-yellow-300" {...register(`toxicItems.${index}.name` as const)} placeholder="Item Name" />
              <HtmlInput
                {...register(`toxicItems.${index}.weight`, { valueAsNumber: true })}
                placeholder="Item Weight in mg"
                type="number"
                className="bg-[#181825] text-white border-white focus:border-yellow-300 "
              />
            </div>
            <div className="flex justify-end mt-2">
              <Button
                variant="text"
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </Button>
            </div>
          </div>
        )
      })}
      <Button className="text-center" variant="outlined" fullWidth onClick={() => append({ name: '', weight: 0 })}>
        Add Toxic Item
      </Button>
    </div>
  );
};

export default AddToxicItems;
