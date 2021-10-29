# Workspace

| Thuộc tính   | Kiểu dữ liệu |
| ------------ | ------------ |
| workspaceId  | ObjectId     |
| name         | string       |
| leaderIdList | array        |
| memberIdList | array        |
| columnIdList | array        |
| createById   | ObjectId     |
| status       | string       |
| timestamp    |              |

**Giải thích**

* workspaceId là duy nhất để định danh workspace
* leaderIdList là mảng chứa tất cả Id của leader, tương tự với memberIdList. 
* columnIdList là mảng chứa tất cả các column có trong workspace đó.
* createById lưu giữ Id người tạo. 
* status lưu giữ trạng thái workspace đã bị xóa hay chưa.

# Person

| Thuộc tính      | Kiểu dữ liệu |
| --------------- | ------------ |
| personId        | ObjectId     |
| email           | string       |
| name            | string       |
| avaUrl          | string       |
| workspaceIdList | array        |
| taskIdList      | array        |
| timestamp       |              |

**Giải thích**

Person lưu giữ thông tin của một người sử dụng.
* Lưu giữ các thông tin cơ bản
* workspaceIdList là mảng chứa Id của các workspace mà người đó tham gia. tương tự với taskId


# Column

| Thuộc tính | Kiểu dữ liệu |
| ---------- | ------------ |
| columnId   | ObjectId     |
| name       | string       |
| taskIdList | array        |
| timestamp  |              |

* columnId định danh cột đó
* name là tên của cột đó
* taskIdList là mảng chứa id các cột

# task


| Thuộc tính    | Kiểu dữ liệu |
| ------------- | ------------ |
| taskId        | ObjectId     |
| name          | string       |
| description   | string       |
| priority      | string       |
| deadline      | date         |
| logIdList     | array        |
| memberIdList  | array        |
| commentIdList | array        |
| linkList      | array        |
| progession    | number       |
| timestamp     |              |

**Giải thích** 
* Task có lưu trữ những thông tin cơ bản của một task. 
* MemberIdList là mảng lưu Id của những người được gán. 
* LinkList là mảng chứa các đường dẫn ggdrive,... 
* LogIdList là mảng chứa những logId của Task đó. 
* Tương tự với commentIdList là mảng chứa những commentId của task đó.

# Comment

| Thuộc tính | Kiểu dữ liệu |
| ---------- | ------------ |
| commentId  | ObjectId     |
| content    | string       |
| personId   | ObjectId     |
| timestamp  |              |


**Giải thích** 
* personId lưu mã Id của người bình luận.

# Log

| Thuộc tính  | Kiểu dữ liệu |
| ----------- | ------------ |
| logId       | ObjectId     |
| description | string       |
| personId    | ObjectId     |
| behavior    | ObjectId     |
| timestamp   |              |



**Giải thích**

* logId định danh bản log đó
* behavior là tên của hành động. 
* description là mô tả hành động đó
* personId là Id của người thực hiện hành động đó


