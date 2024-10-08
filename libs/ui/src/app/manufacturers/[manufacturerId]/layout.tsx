type LayoutProps = {
  children: React.ReactNode;
  params: { manufacturerId: string }
}

const layout = ({ children, params }: LayoutProps) => {
  return (
    <main>{children}</main>
  )
}

export default layout
