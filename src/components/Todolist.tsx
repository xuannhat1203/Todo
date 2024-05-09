import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import JobItem from "./JobItem";
type Job = {
    id:string,
    name:string,
    status:boolean,
}
export default function Todolist() {
    const [jobLocal,setJobLocal] = useState<Job[]>(()=>{
        // lấy dữ liệu trên local
        const listJobLocal = localStorage.getItem("jobs");
        // kiểm tra xem trên local có dữ liệu không nếu có sẽ ép kiểu từ JSON thành JS, nếu không có sẽ trả về 1 mảng rỗng
        const listJob = listJobLocal ? JSON.parse(listJobLocal): [];
        // trả về 1 mảng Jobs và gán làm giá trị khởi tạo cho state
        return listJob;
    });
    // hàm lưu dữ liệu lên local
    const saveLocalStorage = (key:string,value:any) => {
        localStorage.setItem(key,JSON.stringify(value));
    }
    const [stateFake,setStateFake] = useState<string>("");
    // state để lưu trữ giá trị trong input
    const [inputValue,setInputValue] = useState<string>("");
    // state để lưu trữ trạng thái ẩn hiện lỗi
    const [showError,setShowError] = useState<boolean>(false);
    // lấy giá trị trong ô input
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        // cập nhật lại giá trị của state lưu trữ giá trị trong ô input
        setInputValue(e.target.value);
        // Validate dữ liệu đầu vào
        if(!e.target.value){
            setShowError(true);
        }else{
            setShowError(false);
        }
    }
    // hàm thêm mới công việc
    const handleCreateJob = () =>{
        // kiểm tra điều kiện input đã có dữ liệu chưa
        if(inputValue){
            // tạo đối tượng Job
            const job: Job = { 
                id:uuidv4(),
                name:inputValue,
                status:false,
            }
            // đẩy dữ liệu lên localstorage
            jobLocal.push(job)
            // Lưu dữ liệu lên local
            saveLocalStorage("jobs",jobLocal);
            // reset lại giá trị trong ô input và phải cho value vào trong ô input
            setInputValue("");
        }
    }
    // hàm sử lý thay đổi trạng thái công việc
    const handleChangeStatus = (id:string) => {
        const findIndexJob = jobLocal.findIndex((job:Job) => job.id === id);
        // thay đổi trạng thái của công việc
         if(findIndexJob === -1){
            alert("Không tìm thấy");
         }else{
            jobLocal[findIndexJob].status = !jobLocal[findIndexJob].status;
            setStateFake("123");
            // lưu lại dữ liệu lên localStorage
            saveLocalStorage("jobs",jobLocal);
         }
    }   
  return (
    <div className="todo-container">
    <h2>ToDo List</h2>
    <div className="input-container">
      <input value={inputValue} onChange={handleChange} type="text" id="taskInput" placeholder="Add new task..." />
      <button onClick={handleCreateJob} className="button">Add Task</button>
    </div>
    {showError == true ? <span className="error">Tên công việc không được phép để trống</span>:("")}
    <ul id="taskList">
        {/* render danh sách công việc ra ngoài giao diện */}
        {jobLocal.map((job:Job)=>(
            <div key={job.id}>
                <JobItem job = {job} handleChangeStatus = {handleChangeStatus} />
            </div>
        ))}
    </ul>
    <p>
      Tasks completed: <span id="completedTasks">0</span>
    </p>
  </div>
  )
}
