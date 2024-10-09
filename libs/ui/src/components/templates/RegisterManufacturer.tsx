'use client'

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'; // Assuming you're using react-hook-form directly
import { useAccount } from '@recycle-chain/util/src/hooks/ether';
import { Form } from '../atoms/Form';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { HtmlInput } from '../atoms/HtmlInput';
import { Button } from '../atoms/Button';
import { PageTitle } from '../atoms/PageTitle';

type FormData = {
  name: string;
  location: string;
  contact: string;
};

export const RegisterManufacturer = () => {
  // If useFormRegisterManufacturer is from react-hook-form, ensure it's typed with FormData
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const { contract, account } = useAccount();
  const [loading, setLoading] = useState(false);

  const submitHandler: SubmitHandler<FormData> = (data) => {
    console.log(`🔔%cRegisterManufacturer.tsx:18 - data`, 'font-weight:bold; background:#53ac00;color:#fff;'); // DELETEME
    console.log(data); // DELETEME
  };

  return (
    <div>
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

