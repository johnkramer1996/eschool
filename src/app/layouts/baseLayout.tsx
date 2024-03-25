import { Layout } from 'shared/ui'
import { Footer, Header } from 'widgets'

export const BaseLayout = () => {
  return <Layout headerSlot={<Header />} footerSlot={<Footer />} />
}
