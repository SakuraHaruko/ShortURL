import {notFound} from "next/navigation";

interface ApiResponse {
    code: number;
    message: string;
    data?: {
        url: string;
    };
}


export async function GET(
    request: Request,
    {params}: { params: { slug: string } }
) {
    const apiUrl = "https://api.nekocafe.moe/app/shorturl/query";
    const slug = params.slug;
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: slug
            }),
        });

        const result: ApiResponse = await response.json();

        if (result.code === 1) {
            return notFound()
        } else if (result.code === 0 && result.data) {
            return Response.redirect(result.data.url)
        }
    } catch (error) {
        return Response.redirect("https://qwq.lgbt")
    }
}