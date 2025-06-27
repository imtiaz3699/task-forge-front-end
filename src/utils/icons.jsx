import { MdDashboard } from "react-icons/md";

export const ThreeDots = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical cursor-pointer"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
};

export const DropDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-chevron-down-icon lucide-chevron-down"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};

export const UserIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-user-icon lucide-user"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};

// export const Invoice = () => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       stroke-width="2"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//       class="lucide lucide-container-icon lucide-container"
//     >
//       <path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z" />
//       <path d="M10 21.9V14L2.1 9.1" />
//       <path d="m10 14 11.9-6.9" />
//       <path d="M14 19.8v-8.1" />
//       <path d="M18 17.5V9.4" />
//     </svg>
//   );
// };

export const Eye = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-eye-icon lucide-eye"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};

export const BackArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-move-left-icon lucide-move-left"
    >
      <path d="M6 8L2 12L6 16" />
      <path d="M2 12H22" />
    </svg>
  );
};

export const Home = () => {
  return <MdDashboard />;
};

export const Transaction = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M13.492 1.66663H6.50866C3.47533 1.66663 1.66699 3.47496 1.66699 6.50829V13.4833C1.66699 16.525 3.47533 18.3333 6.50866 18.3333H13.4837C16.517 18.3333 18.3253 16.525 18.3253 13.4916V6.50829C18.3337 3.47496 16.5253 1.66663 13.492 1.66663ZM14.3837 8.29996L12.4587 10.7833C12.217 11.0916 11.8753 11.2916 11.4837 11.3333C11.092 11.3833 10.7087 11.275 10.4003 11.0333L8.87533 9.83329C8.81699 9.78329 8.75033 9.78329 8.71699 9.79163C8.68366 9.79163 8.62533 9.80829 8.57533 9.87496L6.59199 12.45C6.46699 12.6083 6.28366 12.6916 6.10033 12.6916C5.96699 12.6916 5.83366 12.65 5.71699 12.5583C5.44199 12.35 5.39199 11.9583 5.60033 11.6833L7.58366 9.10829C7.82533 8.79996 8.16699 8.59996 8.55866 8.54996C8.94199 8.49996 9.33366 8.60829 9.64199 8.84996L11.167 10.05C11.2253 10.1 11.2837 10.1 11.3253 10.0916C11.3587 10.0916 11.417 10.075 11.467 10.0083L13.392 7.52496C13.6003 7.24996 14.0003 7.19996 14.267 7.41663C14.542 7.64163 14.592 8.03329 14.3837 8.29996Z"
        fill="#929EAE"
      />
    </svg>
  );
};

export const Invoice = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M13.1503 1.66663H6.85033C3.70033 1.66663 2.91699 2.50829 2.91699 5.86663V15.25C2.91699 17.4666 4.13366 17.9916 5.60866 16.4083L5.61699 16.4C6.30033 15.675 7.34199 15.7333 7.93366 16.525L8.77533 17.65C9.45033 18.5416 10.542 18.5416 11.217 17.65L12.0587 16.525C12.6587 15.725 13.7003 15.6666 14.3837 16.4C15.867 17.9833 17.0753 17.4583 17.0753 15.2416V5.86663C17.0837 2.50829 16.3003 1.66663 13.1503 1.66663ZM12.292 8.95829H7.70866C7.36699 8.95829 7.08366 8.67496 7.08366 8.33329C7.08366 7.99163 7.36699 7.70829 7.70866 7.70829H12.292C12.6337 7.70829 12.917 7.99163 12.917 8.33329C12.917 8.67496 12.6337 8.95829 12.292 8.95829Z"
        fill="#929EAE"
      />
    </svg>
  );
};

export const Clients = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M12.3747 3.29232V6.45898H11.1247V3.29232C11.1247 3.06732 10.9247 2.95898 10.7913 2.95898C10.7497 2.95898 10.708 2.96732 10.6663 2.98398L4.05801 5.47565C3.61634 5.64232 3.33301 6.05898 3.33301 6.53398V7.09232C2.57467 7.65898 2.08301 8.56733 2.08301 9.59233V6.53398C2.08301 5.54232 2.69134 4.65898 3.61634 4.30898L10.233 1.80898C10.4163 1.74232 10.608 1.70898 10.7913 1.70898C11.6247 1.70898 12.3747 2.38398 12.3747 3.29232ZM17.9169 12.0833V12.9167C17.9169 13.1417 17.7419 13.325 17.5086 13.3333H16.2919C15.8503 13.3333 15.4503 13.0083 15.4169 12.575C15.3919 12.3167 15.4919 12.075 15.6586 11.9083C15.8086 11.75 16.0169 11.6667 16.2419 11.6667H17.5003C17.7419 11.675 17.9169 11.8583 17.9169 12.0833Z"
        fill="#929EAE"
      />
      <path
        d="M16.233 10.7917H17.083C17.5413 10.7917 17.9163 10.4167 17.9163 9.95837V9.59171C17.9163 7.86671 16.508 6.45837 14.783 6.45837H5.21634C4.50801 6.45837 3.85801 6.69171 3.33301 7.09171C2.57467 7.65837 2.08301 8.56671 2.08301 9.59171V15.2C2.08301 16.925 3.49134 18.3334 5.21634 18.3334H14.783C16.508 18.3334 17.9163 16.925 17.9163 15.2V15.0417C17.9163 14.5834 17.5413 14.2084 17.083 14.2084H16.358C15.558 14.2084 14.7913 13.7167 14.583 12.9417C14.408 12.3084 14.6163 11.7 15.033 11.2917C15.3413 10.975 15.7663 10.7917 16.233 10.7917ZM11.6663 10.625H5.83301C5.49134 10.625 5.20801 10.3417 5.20801 10C5.20801 9.65837 5.49134 9.37504 5.83301 9.37504H11.6663C12.008 9.37504 12.2913 9.65837 12.2913 10C12.2913 10.3417 12.008 10.625 11.6663 10.625Z"
        fill="#929EAE"
      />
    </svg>
  );
};

export const Product = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-shopping-bag-icon lucide-shopping-bag"
    >
      <path d="M16 10a4 4 0 0 1-8 0" />
      <path d="M3.103 6.034h17.794" />
      <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
    </svg>
  );
};

export const Category = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-chart-bar-stacked-icon lucide-chart-bar-stacked"
    >
      <path d="M11 13v4" />
      <path d="M15 5v4" />
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <rect x="7" y="13" width="9" height="4" rx="1" />
      <rect x="7" y="5" width="12" height="4" rx="1" />
    </svg>
  );
};

export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-x-icon lucide-x"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};
