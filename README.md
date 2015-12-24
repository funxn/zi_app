### PS
    决定将“红心”和“随机”放由客户端处理：user对象中有红心列表，随机则通过客户端‘按规则’生成随机值作为pid，对服务器端发起请求
    bgColor_list[]数组和song_list[]数组随着poetry对象交给客户端自行选择，便于客户端用户自由切换‘颜色’和‘背景音乐’
    
### 数据结构JSON
>User:
    {
        username : {type : String, default: ""},
        password : {type : String, default: ""},
        redHeart_list: {type: Array, default: []}					// 列表中元素格式:
                                                                    // {pid: P0001, sid: S0001}
    }

>Poetry:
    {
        pid: {type : String, default: ""},
        bgColor_list: {type: Array, default: []},
        song_list: {type: Array, default: []},
        content: {
            title: {type: String, default: ""},
            author: {type: String, default: ""},
            lines: {type: String, default: ""}
        }
    }

### 前后端接口声明(JSON格式)： 
> POST: 
    /user/login
    用户登录 发送{"username": "xiaofeng", "password": "222333"} 返回： 成功： {"code": 1, "user": user对象} 失败： {"code": 0, "user": null} /user/reg: 用户注册 发送{"username": "xiaofeng", "password": "222333"} 返回： 成功： {"code": 1, "user": user对象} 失败： {"code": 0, "user": null}

> GET: 
    /getPoetry/:id
    获取特定id的诗词曲 成功： {"code": 1, "poetry": poetry对象} 失败： {"code": 0, "msg": "错误信息"}
    /getSong/:id 获取特定id的诗词曲 成功： {"code": 1, "song": song对象} 失败： {"code": 0, "msg": "错误信息"}