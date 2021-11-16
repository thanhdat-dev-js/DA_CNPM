# workspace

| Thuộc tính   | Kiểu dữ liệu |
| ------------ | ------------ |
| id           | ObjectId     |
| name         | string       |
| memberIdList | array        |
| columnIdList | array        |
| createdById  | ObjectId     |
| createdAt    | timestamps   |

**Giải thích**

* id là duy nhất để định danh workspace
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
| uid        | string       |
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
| uid        | ObjectId     |
| timestamp  | timestamps   |


**Giải thích** 
* id lưu mã Id của người bình luận.
