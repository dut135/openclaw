export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "오늘 미국 증시 기관 수급 특징은?";

    // [본질] AI가 사용할 수 있는 도구(Tool) 정의
    const tools = [
      {
        name: "web_search",
        description: "최신 주식 시장 데이터 및 기관 수급 정보를 검색합니다.",
        parameters: {
          type: "object",
          properties: { query: { type: "string", description: "검색어" } },
          required: ["query"]
        }
      }
    ];

    try {
      // 1단계: AI에게 질문 던지기 (도구를 쓸지 판단하게 함)
      const response = await env.AI.run("@cf/meta/llama-3.1-70b-instruct", {
        messages: [
          { 
            role: "system", 
            content: "너는 Tukim의 전속 분석 에이전트다. 반드시 한국어로 대답하고, 정보가 필요하면 web_search 도구를 사용해라. 말투는 냉정한 스웩 버전이다." 
          },
          { role: "user", content: query }
        ],
        tools: tools
      });

      // 2단계: AI가 도구를 쓰겠다고 하면 실행 (여기가 에이전트의 핵심!)
      // *실제 배포 시에는 여기에 브라우저 렌더링이나 검색 API 연동 로직이 들어갑니다.
      
      return new Response(response.response || "에이전트가 데이터를 분석 중입니다. 잠시만 기다려.", {
        headers: { "content-type": "text/plain;charset=UTF-8" }
      });

    } catch (e) {
      return new Response("에이전트 시동 실패: " + e.message);
    }
  }
}
