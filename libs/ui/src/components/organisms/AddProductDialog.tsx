import { FormProviderCreateProduct, FormTypeCreateProduct } from '@recycle-chain/forms/src/createProduct';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '../atoms/Button';
import { Dialog } from '../atoms/Dialog';
import { Form } from '../atoms/Form';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { HtmlInput } from '../atoms/HtmlInput';
import AddToxicItems from './AddToxicItems';

export const AddProductContent = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState } = useFormContext<FormTypeCreateProduct>();
  const { errors } = formState;
  return (
    <div >
      <Button variant="outlined" onClick={() => setOpen(true)} className="flex items-center gap-2 text-white border-white">
        Add product
      </Button>
      <Dialog open={open} setOpen={setOpen} title={"Add Product"} className="bg-[#181825]" >
        <Form className="bg-[#181825]">
          <HtmlLabel title="Name" error={errors.name?.message} >
            <HtmlInput className="bg-[#181825]" placeholder="Enter name" {...register('name')} />
          </HtmlLabel>
          {/* NOTE: Add toxic items */}
          <AddToxicItems />
          <Button fullWidth loading={loading} type="submit">Submit</Button>
        </Form>
      </Dialog>
    </div>
  )
}

export const AddProductDialog = () => {
  return (
    <FormProviderCreateProduct>
      <AddProductContent />
    </FormProviderCreateProduct>
  )
}
