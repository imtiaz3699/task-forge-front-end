import { useEffect, useState } from "react";
import CustomInput from "../../../Components/SharedComponents/CustomInput";
import CustomSelect from "../../../Components/SharedComponents/CustomSelect";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";
import { useUser } from "../../../context/userContext";
function CreateTeams() {
  const { user, token } = useUser();
  const [members, setMembers] = useState([
    {
      label: "",
      value: "",
    },
  ]);
  const [teamLead, setTeamLead] = useState([]);
  const formik = useFormik({
    initialValues: {
      team_title: "",
      team_members: [],
      manager: "",
      team_lead: "",
      created_by: user?._id,
    },
  });
  const getUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/teams/get-users/${user?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const options = res?.data?.data?.map((element, idx) => ({
        label: element?.name,
        value: element?._id,
      }));
      setMembers(options);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUsers();
  }, [user?._id]);
  useEffect(() => {
    const lead = members?.filter(
      (element) =>
        element?.value?.toString() !== formik.values?.manager?.toString()
    );
    if (lead?.length > 0) {
      setTeamLead(lead);
    }
  }, [formik.values.manager]);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-row items-center justify-between gap-10">
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
          multiSelect={true}
          color={true}
          label="Select Team Members"
          defaultSelect={"Select Team Members"}
          options={members ?? []}
          onChange={formik.handleChange}
          name="team_members"
          value={formik.values.team_members}
          error={formik.errors.team_members}
        />
      </div>
      <div className="flex flex-row items-center justify-between gap-10">
        <CustomSelect
          color={true}
          options={members ?? []}
          label="Select Manager"
          defaultSelect={"Select Manager"}
          onChange={formik.handleChange}
          name="manager"
          value={formik.values.manager}
          error={formik.errors.manager}
        />
        <CustomSelect
          color={true}
          label="Select Team Lead"
          defaultSelect={"Select Team Lead"}
          options={teamLead ?? []}
          onChange={formik.handleChange}
          name="team_lead"
          value={formik.values.team_lead}
          error={formik.errors.team_lead}
        />
      </div>
    </div>
  );
}

export default CreateTeams;
