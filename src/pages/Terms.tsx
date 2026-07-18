import Layout from "@/components/layout/Layout";
import { SITE } from "@/lib/site";

const Terms = () => {
  return (
    <Layout>
      <article className="pt-8 pb-20">
        <div className="container-custom max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-10">Last updated: July 18, 2026</p>

          <div className="prose prose-neutral max-w-none space-y-8 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="font-display text-2xl font-semibold mb-3">Agreement</h2>
              <p>
                By using {SITE.url} or booking services with {SITE.legalName}, you agree to these
                terms. If you do not agree, please do not use the site or booking forms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-3">Services</h2>
              <p>
                Our website provides information about salon services and a way to request
                appointments. Submitting a booking request does not guarantee availability until
                confirmed by our team.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-3">Appointments & cancellations</h2>
              <p>
                Please arrive on time for scheduled appointments. We ask for at least 24 hours’
                notice for cancellations or reschedules so we can offer the time to other clients.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-3">Website content</h2>
              <p>
                Content on this site (including text, images, and branding) is owned by{" "}
                {SITE.name} or its licensors and may not be copied for commercial use without
                permission.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-3">Contact</h2>
              <p>
                For questions about these terms, contact{" "}
                <a className="text-primary underline" href={`mailto:${SITE.email}`}>
                  {SITE.email}
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

export default Terms;
