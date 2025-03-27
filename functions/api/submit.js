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
    
    // 将数据转换为可读文本格式
    const formattedMessage = `
新的询盘: 新联系表单提交:
姓名: ${data.name || '未提供'}
公司: ${data.company || '未提供'}
邮箱: ${data.email || '未提供'}
电话: ${data.phone || '未提供'}
兴趣产品: ${data.interest || '未提供'}
留言内容: ${data.message || '未提供'}
    `;
    
    // 发送格式化后的消息到Bark
    const encodedMessage = encodeURIComponent(formattedMessage);
    const response = await fetch(`https://api.day.app/fRJPuzdAKSGEurGpquZp99/新联系表单/${encodedMessage}`);
    const barkResponse = await response.json();
    console.log(barkResponse);
    // https://oapi.dingtalk.com/robot/send?access_token=306e33a088beff8b3311a957f4fec3720ef4f7a65c44ea8fef9c76a3c4a9acb7


    const dingtalkResponse = await fetch(`https://oapi.dingtalk.com/robot/send?access_token=306e33a088beff8b3311a957f4fec3720ef4f7a65c44ea8fef9c76a3c4a9acb7`, {
      method: 'POST',
      body: JSON.stringify({
        msgtype: 'text',
        text: {
          content: formattedMessage
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    console.log(dingtalkResponse);

    // 返回成功响应
    return new Response(JSON.stringify({
      success: true,
      message: '数据已成功接收',
      barkResponse: barkResponse,
      dingtalkResponse: dingtalkResponse
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