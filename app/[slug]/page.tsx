'use client'
import { useParams } from 'next/navigation'
import Love_response from '@/component/love_response';


export default function DynamicPage() {
  const params = useParams();
  const name = params.slug;

  return (
    // This is a React Fragment. It acts as the "one parent element"
    <>
      <Love_response />
      {/* NOTE: Rendering both at once will show both screens. 
          Usually, you only want to show Love_response after the YES click.
      */}
     
    </>
  );
}