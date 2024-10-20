import { useApolloClient } from '@apollo/client';
import { useAccount } from "@recycle-chain/util/src/hooks/ether";
import { useState } from "react";
import { useFormBulkStatusUpdate } from '@recycle-chain/forms/src/bulkStatusUpdate';
import { Button } from '../atoms/Button';
import { Dialog } from '../atoms/Dialog';
import { Form } from '../atoms/Form';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { HtmlInput } from '../atoms/HtmlInput';
import { HtmlSelect } from '../atoms/HtmlSelect';
import { namedOperations, ProductStatus } from '@recycle-chain/network/src/gql/generated';
import { toast } from '../molecules/Toast';
import { updateProductItemStatus } from '@recycle-chain/util/src/actions/updateProductItemStatus';

const { Sold, Manufactured, Returned, Recycled } = ProductStatus;

const REVERSED_STATUS_MAP: Partial<Record<ProductStatus, ProductStatus>> = {
  [Sold]: Manufactured,
  [Returned]: Sold,
  [Recycled]: Returned,
  [Manufactured]: Recycled,
}

const BulkStatusUpdateDialog = () => {

  const [open, setOpen] = useState(false);
  const { contract } = useAccount();
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState, watch, } = useFormBulkStatusUpdate();
  const handle_form_submit = async ({ ids, status: targetStatus }: { ids: string, status: ProductStatus }) => {
    setLoading(true);
    if (!contract) {
      toast('Please connect your wallet 👛👛');
      return;
    }

    const idsArray = ids.split(',').map((id: string) => id.trim());
    const currentStatus = REVERSED_STATUS_MAP[targetStatus]
    console.log(`❌%cBulkStatusUpdateDialog.tsx:43 - currentStatus`, 'font-weight:bold; background:#8c7300;color:#fff;'); //DELETEME:
    console.log(currentStatus); // DELETEME:
    if (!currentStatus || !contract) {
      toast('Something went wrong updating the status product item😩😩 😩');
      return;
    }
    const new_status = await updateProductItemStatus({ contract, payload: { productItemIds: idsArray, currentStatus } });
    if (new_status) {
      reset();
      setOpen(false);
      toast('Product status successfully updated  🤓🤓🎉🤓🎉🎉');
      client.refetchQueries({
        include: [
          namedOperations.Query.ProductItems,
          namedOperations.Query.Product,
        ]
      })
    } else {
      toast('Something went wrong updating the status product item 😩😩😰😩😰😰');
    }
    setLoading(false);
  }

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)} className="flex items-center gap-2">
        Bulk status update
      </Button>
      <Dialog open={open} setOpen={setOpen} title="Bulk status update">
        <Form onSubmit={handleSubmit(handle_form_submit)}>
          <HtmlLabel>
            <HtmlInput {...register('ids')} placeholder="1-1,1-2,3-2..." />
          </HtmlLabel>
          <HtmlLabel>
            <HtmlSelect placeholder="Item status" {...register('status')}>
              {[Manufactured, Sold, Returned, Recycled].map((status) => {
                return <option key={status} value={status}>{status}</option>
              })}
            </HtmlSelect>
          </HtmlLabel>

          <Button loading={loading} type="submit">Submit</Button>

        </Form>
      </Dialog>
    </>
  )
}

export default BulkStatusUpdateDialog
