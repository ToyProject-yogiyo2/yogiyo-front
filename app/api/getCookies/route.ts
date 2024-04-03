'use server'
import ServerLoginCheck from "@/components/common/ServerLoginCheck";

export async function GET() {
  const cookies = ServerLoginCheck();

  return new Response(JSON.stringify(cookies), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}