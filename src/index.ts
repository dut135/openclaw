export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "엔진 가동 확인";

    try {
      // 보안 검사 다 무시하고 바로 라마 8B(가벼운 놈)로 시동 걸기
      // @ts-ignore
      const result = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
        messages: [{ role: "user", content: query }]
      });

      return new Response(result.response, { 
        headers: { "content-type": "text/plain;charset=UTF-8" } 
      });
    } catch (e) {
      return new Response("엔진 대기 중... 잠시 후 새로고침: " + e.message);
    }
  }
};
