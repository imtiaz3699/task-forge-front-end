import { useEffect, useState } from "react";
import CustomInput from "../../../Components/SharedComponents/CustomInput";
import CustomSelect from "../../../Components/SharedComponents/CustomSelect";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL, routes } from "../../../utils/config";
import { useUser } from "../../../context/userContext";
import { useNavigate, useParams } from "react-router";
function CreateTeams() {
  const { user, token } = useUser();
  const { id } = useParams();
  console.log(id, "flasdjhflasjdhflasd");
  const navigate = useNavigate();
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
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (id) {
          const response = await axios.post(
            BASE_URL + `/teams/update-teams/${id}`,
            values,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response?.status === 200) {
            navigate(routes.TEAMS, { replace: true });
          }
        } else {
          const response = await axios.post(
            BASE_URL + "/teams/create-teams",
            values,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Uncomment if you need to send a token
              },
            }
          );
          if (response?.status === 201) {
            navigate(routes.TEAMS, { replace: true });
          }
          alert("User Created Successfull!");
          resetForm();
        }
      } catch (e) {
        console.log(e);
      } finally {
        setSubmitting(false);
      }
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
  const updateTeams = async () => {
    try {
      if (id) {
        const teams = await axios.get(
          `${BASE_URL}/teams/get-single-teams/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = teams?.data?.data;
        if (teams?.status === 200) {
          formik.setFieldValue("team_title", data?.team_title);
          formik.setFieldValue("manager", data?.manager);
          formik.setFieldValue("team_lead", data?.team_lead);
          handleChange(data?.team_members);
        }
      }
    } catch (e) {
      console.log(e);
      return res.stauts(500).json({ message: "" });
    }
  };
  useEffect(() => {
    updateTeams();
  }, [id]);
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
    formik.setFieldValue("team_members", value);
  };
  console.log(formik.values, "fasdlfjasd2787vales");
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full flex flex-col gap-10"
    >
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
          onChange={handleChange}
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
      <div className="flex items-center justify-end w-full ">
        <button
          className="bg-gray-800 cursor-pointer text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="submit"
        >
          Create Team
        </button>
      </div>
    </form>
  );
}

export default CreateTeams;
