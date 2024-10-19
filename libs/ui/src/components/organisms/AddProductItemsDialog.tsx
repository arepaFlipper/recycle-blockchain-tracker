import { useState } from 'react'
import { useApolloClient } from '@apollo/client';
import { useFormAddProductItems } from '@recycle-chain/forms/src/addProductItems';
import { useAccount } from '@recycle-chain/util/src/hooks/ether';
import { Button } from '../atoms/Button';
import { Dialog } from '../atoms/Dialog';
import { Form } from '../atoms/Form';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { HtmlInput } from '../atoms/HtmlInput';
import { addProductItems } from '@recycle-chain/util/src/actions/addProductItems';
import { namedOperations } from '@recycle-chain/network/src/gql/generated';
import { toast } from 'react-toastify';

type IAddProductItemsDialogProps = {
  productId: string;
}

const AddProductItemsDialog = ({ productId }: IAddProductItemsDialogProps) => {
  const [open, setOpen] = useState(false);
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState } = useFormAddProductItems();
  const { errors } = formState;
  const { contract } = useAccount();

  const handle_form_submit = async ({ quantity }: { quantity: number }) => {
    setLoading(true);
    if (!contract) {
      toast('Please connect your wallet 👛');
      return;
    }
    const status = await addProductItems({ contract, payload: { productId, quantity } })

    if (status) {
      reset();
      client.refetchQueries({
        include: [
          namedOperations.Query.Product,
          namedOperations.Query.ProductItems,
        ]
      });
      toast('Product created successfully 😀 🎉 😌');
    } else {
      toast('Something went wrong adding the product item 😢 🥺');
    };

    setLoading(false);
  }

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)} className="flex items-center gap-2">
        Add Items
      </Button>

      <Dialog open={open} setOpen={setOpen} title={'Add product items'} >
        <Form onSubmit={handleSubmit(handle_form_submit)}>
          <div className="text-lg font-semibold ">Product #{productId}</div>
          <HtmlLabel title="Quantity" error={errors.quantity?.message}>
            <HtmlInput placeholder="Enter quantity" {...register('quantity', { valueAsNumber: true })} />
          </HtmlLabel> {' '}
          <Button loading={loading} type="submit">Add Items</Button>
        </Form>
      </Dialog>
    </>
  )
}

export default AddProductItemsDialog
