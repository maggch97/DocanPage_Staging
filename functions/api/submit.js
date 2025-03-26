export async function onRequest(context) {
  // 获取请求上下文
  const { request, env } = context;
  
  // 检查是否为POST请求
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({
      success: false,
      message: '只支持POST请求'
    }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
  
  // 处理OPTIONS请求（用于CORS预检）
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
  
  try {
    // 解析请求体中的JSON数据
    const data = await request.json();
    
    // 基本验证
    if (!data || typeof data !== 'object') {
      return new Response(JSON.stringify({
        success: false,
        message: '无效的请求数据'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // 在这里我们将添加发送邮件和存储KV的逻辑
    // TODO: 实现邮件发送功能
    // TODO: 实现KV存储功能
    // send message to get https://api.day.app/fRJPuzdAKSGEurGpquZp99/推送标题/这里改成你自己的推送内容
    const response = await fetch('https://api.day.app/fRJPuzdAKSGEurGpquZp99/推送标题/这里改成你自己的推送内容');
    const barkResponse = await response.json();
    console.log(barkResponse);

    // 返回成功响应
    return new Response(JSON.stringify({
      success: true,
      message: '数据已成功接收',
      barkResponse: barkResponse
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    // 捕获处理过程中的任何错误
    return new Response(JSON.stringify({
      success: false,
      message: '处理请求时出错',
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
} 