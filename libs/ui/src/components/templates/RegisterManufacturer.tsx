'use client'

import { useState } from 'react';
import { useFormRegisterManufacturer } from '@recycle-chain/forms/src/registerManufacturer'
import { useAccount } from '@recycle-chain/util/src/hooks/ether';
import { Form } from '../atoms/Form';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { HtmlInput } from '../atoms/HtmlInput';
import { Button } from '../atoms/Button';
import { PageTitle } from '../atoms/PageTitle';

export const RegisterManufacturer = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useFormRegisterManufacturer()
  const { contract, account } = useAccount();
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <PageTitle>Register</PageTitle>
      <Form className="max-w-md">
        <HtmlLabel title="Name" error={(errors.name?.message || "") as string}> <HtmlInput {...register('name')} /> </HtmlLabel>
        <HtmlLabel title="Address" error={(errors.location?.message || "") as string}> <HtmlInput {...register('location')} /> </HtmlLabel>
        <HtmlLabel title="Contact" error={(errors.contact?.message || "") as string}> <HtmlInput {...register('contact')} /> </HtmlLabel>

        <Button loading={loading} type="submit">Register</Button>
      </Form>
    </div>
  )
}
