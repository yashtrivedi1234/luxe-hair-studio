import Layout from "@/components/layout/Layout";
import { SITE } from "@/lib/site";

const Privacy = () => {
  return (
    <Layout>
      <article className="pt-8 pb-20">
        <div className="container-custom max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-10">Last updated: July 18, 2026</p>

          <div className="prose prose-neutral max-w-none space-y-8 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="font-display text-2xl font-semibold mb-3">Who we are</h2>
              <p>
                {SITE.legalName} (“we”, “us”) operates {SITE.url}. This policy explains how we
                handle information when you browse our site, contact us, or book salon services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-3">Information we collect</h2>
              <p>We may collect:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Contact details you submit (name, email, phone, message content).</li>
                <li>Booking details (preferred service, date/time, stylist notes).</li>
                <li>Technical data such as browser type, device, and approximate location from IP.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-3">How we use information</h2>
              <p>
                We use your information to respond to inquiries, schedule appointments, improve our
                website, and communicate about services or offers you request. We do not sell your
                personal information.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-3">Sharing</h2>
              <p>
                We may share data with service providers who help us operate the site or salon
                operations (for example hosting or messaging tools), only as needed to provide those
                services, and when required by law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-3">Contact</h2>
              <p>
                Questions about privacy? Email{" "}
                <a className="text-primary underline" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>{" "}
                or call{" "}
                <a className="text-primary underline" href={`tel:${SITE.phone}`}>
                  {SITE.phoneDisplay}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Privacy;
