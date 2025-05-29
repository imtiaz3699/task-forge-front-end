import React, { useEffect } from 'react'
import CustomInput from '../../../Components/SharedComponents/CustomInput'
import CustomSelect from '../../../Components/SharedComponents/CustomSelect'
import { useFormik } from 'formik'
import axios from 'axios'
import { BASE_URL } from '../../../utils/config'
import { useUser } from '../../../context/userContext'
function CreateTeams() {
    const {user,token} = useUser()
    const formik = useFormik({
        initialValues:{
            team_title:"",
            team_members:[],
            manager:"",
            team_lead:"",
            created_by:user?._id
        }
    })
    const getUsers = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/teams/get-users/${user?._id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            console.log(res,'fasdlfhasdlkjfhads')
        }catch (e) {
            console.log(e);
        }
    }
    useEffect(()=> {
        getUsers();
    },[user?._id])       
  return (
    <div className = 'w-full flex flex-col gap-10'>
        <div className= 'flex flex-row items-center justify-between gap-10'>
            <CustomInput
                label="Team Title"
                placeholder={"Enter Team Title..."}
                name="team_title"
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                value={formik.values.team_title}
                error={formik.errors.team_title}
              />
               <CustomSelect
                color={true}
                label="Select Team Members"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "Member", value: "member" },
                ]}
                onChange={formik.handleChange}
                name="team_members"
                value={formik.values.team_members}
                error={formik.errors.team_members}
              />
        </div>
        <div className= 'flex flex-row items-center justify-between gap-10'>
               <CustomSelect
                color={true}
                label="Select Manager"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "Member", value: "member" },
                ]}
                onChange={formik.handleChange}
                name="manager"
                value={formik.values.manager}
                error={formik.errors.manager}
              />
               <CustomSelect
                color={true}
                label="Select Team Lead"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "Member", value: "member" },
                ]}
                onChange={formik.handleChange}
                name="team_lead"
                value={formik.values.team_lead}
                error={formik.errors.team_lead}
              />
        </div>
    </div>
  )
}

export default CreateTeams