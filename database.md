# workspace

| Thuộc tính   | Kiểu dữ liệu |
| ------------ | ------------ |
| id           | ObjectId     |
| name         | string       |
| leaderIdList | array        |
| memberIdList | array        |
| columnIdList | array        |
| createdById  | ObjectId     |
| status       | string       |
| createdAt    | timestamps   |

**Giải thích**

* id là duy nhất để định danh workspace
* leaderIdList là mảng chứa tất cả Id của leader, tương tự với memberIdList. 
* columnIdList là mảng chứa tất cả các column có trong workspace đó.
* createdById lưu giữ Id người tạo. 
* status lưu giữ trạng thái workspace đã bị xóa hay chưa.

# person

| Thuộc tính | Kiểu dữ liệu |
| ---------- | ------------ |
| id         | ObjectId     |
| email      | string       |
| name       | string       |
| avaUrl     | string       |
| createdAt  | timestamps   |

**Giải thích**

Person lưu giữ thông tin của một người sử dụng.
* Lưu giữ các thông tin cơ bản

# column

| Thuộc tính | Kiểu dữ liệu |
| ---------- | ------------ |
| id         | ObjectId     |
| name       | string       |
| taskIdList | array        |
| createdAt  | timestamps   |

* id định danh cột đó
* name là tên của cột đó
* taskIdList là mảng chứa id các cột

# task


| Thuộc tính    | Kiểu dữ liệu |
| ------------- | ------------ |
| id            | ObjectId     |
| name          | string       |
| description   | string       |
| priority      | string       |
| deadline      | date         |
| logIdList     | array        |
| memberIdList  | array        |
| commentIdList | array        |
| linkList      | array        |
| progession    | number       |
| createdAt     | timestamps   |

**Giải thích** 
* Task có lưu trữ những thông tin cơ bản của một task. 
* MemberIdList là mảng lưu Id của những người được gán. 
* LinkList là mảng chứa các đường dẫn ggdrive,... 
* LogIdList là mảng chứa những logId của Task đó. 
* Tương tự với commentIdList là mảng chứa những commentId của task đó.

# comment

| Thuộc tính | Kiểu dữ liệu |
| ---------- | ------------ |
| id         | ObjectId     |
| content    | string       |
| personId   | ObjectId     |
| createdAt  | timestamps   |


**Giải thích** 
* id lưu mã Id của người bình luận.

# log

| Thuộc tính  | Kiểu dữ liệu |
| ----------- | ------------ |
| id          | ObjectId     |
| description | string       |
| personId    | ObjectId     |
| behavior    | ObjectId     |
| createdAt   | timestamps   |



**Giải thích**

* id định danh bản log đó
* behavior là tên của hành động. 
* description là mô tả hành động đó
* personId là Id của người thực hiện hành động đó


