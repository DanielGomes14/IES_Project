export default function() {
  if (window.location.href.includes("/template"))
    return [
      {
        title: "Blog Dashboard",
        to: "/template/blog-overview",
        htmlBefore: '<i class="material-icons">edit</i>',
        htmlAfter: ""
      },
      {
        title: "Blog Posts",
        htmlBefore: '<i class="material-icons">vertical_split</i>',
        to: "/template/blog-posts",
      },
      {
        title: "Add New Post",
        htmlBefore: '<i class="material-icons">note_add</i>',
        to: "/template/add-new-post",
      },
      {
        title: "Forms & Components",
        htmlBefore: '<i class="material-icons">view_module</i>',
        to: "/template/components-overview",
      },
      {
        title: "Tables",
        htmlBefore: '<i class="material-icons">table_chart</i>',
        to: "/template/tables",
      },
      {
        title: "User Profile",
        htmlBefore: '<i class="material-icons">person</i>',
        to: "/template/user-profile-lite",
      },
      {
        title: "Errors",
        htmlBefore: '<i class="material-icons">error</i>',
        to: "/template/errors",
      }
    ];
  else
    return [
      {
        title: "Dashboard",
        to: "/dashboard",
        htmlBefore: '<i class="material-icons">dashboard</i>',
        htmlAfter: ""
      },
      {
        title: "Automations",
        htmlBefore: '<i class="material-icons">autorenew</i>',
        to: "/automation",
      },
      {
        title: "Statistics",
        htmlBefore: '<i class="material-icons">equalizer</i>',
        to: "/statistics",
      },
      {
        title: "House Settings",
        htmlBefore: '<i class="material-icons">home</i>',
        to: "/house-settings",
      },
      {
        title: "Invitations",
        htmlBefore: '<i class="material-icons">group</i>',
<<<<<<< HEAD
        to: "/invitations",
=======
        to: "/group-settings",
      },
      {
        title: "Device Logs",
        htmlBefore: '<i class="material-icons">inventory_2</i>',
        to: "/device-logs",
>>>>>>> 583f4ab979123f35668b64c424904ea0970f0d89
      }
    ];
}
