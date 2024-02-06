import '@/styles/globals.css'
import Nav from '@/components/Nav'


export const metadata = {
  title: 'The Prompt',
  description: 'Discover $ Share AI Prompts',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <div className='main'>
          <div className='gradient'/>
        </div>
        <div className='app'>
          {children}
        </div>
      </body>
    </html>
  )
}
