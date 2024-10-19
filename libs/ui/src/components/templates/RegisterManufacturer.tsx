'use client'

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'; // Assuming you're using react-hook-form directly
import { useAccount } from '@recycle-chain/util/src/hooks/ether';
import { Form } from '../atoms/Form';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { HtmlInput } from '../atoms/HtmlInput';
import { Button } from '../atoms/Button';
import { PageTitle } from '../atoms/PageTitle';
import { registerManufacturer } from '@recycle-chain/util/src/actions/registerManufacturer';
import { useRouter } from 'next/navigation';
import { useApolloClient } from '@apollo/client';
import { namedOperations } from '@recycle-chain/network/src/gql/generated';

type FormData = {
  name: string;
  location: string;
  contact: string;
};

export const RegisterManufacturer = () => {
  // NOTE: If useFormRegisterManufacturer is from react-hook-form, ensure it's typed with FormData
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const { contract, account } = useAccount();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const client = useApolloClient();

  const submitHandler: SubmitHandler<FormData> = async ({ contact, location, name }) => {
    if (!contract) {
      console.error('Contract not found');
      return;
    }
    console.log(`🍱%cRegisterManufacturer.tsx:35 - contract`, 'font-weight:bold; background:#7e8100;color:#fff;'); //DELETEME:
    console.log(contract); // DELETEME:
    setLoading(true);
    const success = await registerManufacturer({ contract, payload: { contact, location, name } });
    setLoading(false);

    if (success) {
      reset();
      router.replace(`/manufacturers/${account}`);
      client.refetchQueries({ include: [namedOperations.Query.Manufacturer] })
    } else {

      alert('Failed to register manufacturer');
    }
  };

  return (
    <div className="bg-[#181825]-">
      <PageTitle>Register</PageTitle>
      <Form className="max-w-md" onSubmit={handleSubmit(submitHandler)}>
        <HtmlLabel title="Name" error={errors.name?.message as string || ""}>
          <HtmlInput placeholder="Enter name" {...register('name')} />
        </HtmlLabel>
        <HtmlLabel title="Address" error={errors.location?.message as string || ""}>
          <HtmlInput placeholder="Enter address" {...register('location')} />
        </HtmlLabel>
        <HtmlLabel title="Contact" error={errors.contact?.message as string || ""}>
          <HtmlInput placeholder="Enter contact" {...register('contact')} />
        </HtmlLabel>

        <Button loading={loading} type="submit">Register</Button>
      </Form>
    </div>
  );
}

