import prisma from "@/lib/prisma";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";
import DeleteSiteForm from "@/components/form/delete-site-form";

export default async function SiteSettingsIndex({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.id),
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="Site Name"
        description="Use for internal reference"
        helpText=""
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: data?.name!,
          placeholder: "My Awesome Site",
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Target URL"
        description="The url you want to show."
        helpText=""
        inputAttrs={{
          name: "targetUrl",
          type: "url",
          defaultValue: data?.targetUrl!,
          placeholder: "https://bento.me/erencan",
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Page Title"
        description="The name of your site. This will be used as the meta title on Google as well."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: "pageTitle",
          type: "text",
          defaultValue: data?.pageTitle!,
          placeholder: "My Awesome Site",
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Description"
        description="The description of your site. This will be used as the meta description on Google as well."
        helpText="Include SEO-optimized keywords that you want to rank for."
        inputAttrs={{
          name: "description",
          type: "text",
          defaultValue: data?.description!,
          placeholder: "A blog about really interesting things.",
        }}
        handleSubmit={updateSite}
      />

      <DeleteSiteForm siteName={data?.name!} />
    </div>
  );
}
