type PageProps = {
  params: { manufacturerId: string }
}

const Page = ({ params }: PageProps) => {
  return (
    <div>Manufacturer {params.manufacturerId}</div>
  );
};

export default Page
