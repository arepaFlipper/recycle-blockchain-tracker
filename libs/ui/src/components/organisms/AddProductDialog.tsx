import { FormProviderCreateProduct, FormTypeCreateProduct } from '@recycle-chain/forms/src/createProduct';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '../atoms/Button';
import { Dialog } from '../atoms/Dialog';
import { Form } from '../atoms/Form';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { HtmlInput } from '../atoms/HtmlInput';
import AddToxicItems from './AddToxicItems';
import { addProduct } from '@recycle-chain/util/src/actions/addProduct';
import { useAccount } from '@recycle-chain/util/src/hooks/ether';
import { useApolloClient } from '@apollo/client';
import { namedOperations, ProductsQuery } from '@recycle-chain/network/src/gql/generated';
import { toast }  from '../molecules/Toast';

type TProduct = NonNullable<ProductsQuery['products']>[0]

export const AddProductContent = () => {
  const client = useApolloClient();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState } = useFormContext<FormTypeCreateProduct>();
  const { errors } = formState;
  const { contract } = useAccount();


  const handleSubmitForm = async (data: FormTypeCreateProduct) => {
    if (!contract) {
      toast ('Please connect your wallet');
      return;
    }
    setLoading(true);
    const toxicNames = (data as TProduct).toxicItems.map((item) => item.name);
    const toxicWeights = (data as TProduct).toxicItems.map((item) => item.weight);
    const status = await addProduct({ contract, payload: { name: data.name, toxicNames, toxicWeights } });
    if (status) {
      reset();
      client.refetchQueries({ include: [namedOperations.Query.Products] });
      toast('Product added successfully 😀 🎉');
    } else {
      toast('Something went wrong adding the product 😢 😢 😢');
    }
    setLoading(false);
  }

  return (
    <div >
      <Button variant="outlined" onClick={() => setOpen(true)} className="flex items-center gap-2 text-white border-white">
        Add product
      </Button>
      <Dialog open={open} setOpen={setOpen} title={"Add Product"} className="bg-[#181825]" >
        <Form
          className="bg-[#181825]"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
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
