import React from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import styles from "../../../styles/footer.module.css";

const CookiePolicy = (props) => {
  return (
    <div className={styles.bodyContainer}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        className={styles.title}>
        Cookie Policy
      </Typography>

      <br />
      <br />

      <Typography variant="h5" className={styles.title} gutterBottom>
        Unoideo Technology Pvt Ltd Cookie Policy
      </Typography>

      <Typography variant="body1" gutterBottom className={styles.description}>
        Unoideo Technology Pvt Ltd operating under its brands “Trustcheckr” &
        “Check for Trust” (“Unoideo”, “TrustCheckr”, “Check For Trust”, “We”,
        “Us”, Our”) is firmly committed to the security and protection of
        personal information of our users and their contacts. This policy is
        designed to help you understand more about how and when Unoideo’s brands
        as mentioned above, use cookies on our applications, sites, services and
        tools and the choices you have. This cookie policy applies to any
        Unoideo product or service that links to this policy or incorporates it
        by reference.
      </Typography>

      <br />
      <br />

      <Typography variant="h6" className={styles.title} gutterBottom>
        1. Cookies
      </Typography>

      <Typography variant="body1" gutterBottom className={styles.description}>
        We use cookies, web beacons, flash cookies, HTML 5 cookies, pixel tags
        and other web application software methods (collectively “cookies”) that
        are essentially small data files to store information in your web
        browser or on your mobile phone, tablet, computer, or other devices
        (collectively "devices") that allow us to store and receive certain
        pieces of information whenever you use or interact with our
        applications, services, sites and tools. <br /> We use the following
        types of cookies:
        <br />
        <br />
        1. Session cookies expire at the end of your browser session and allow
        us to link your actions during that particular browser session.
        <br />
        2. Persistent cookies are stored on your device in between browser
        sessions, allowing us to remember your preferences or actions.
        <br />
        3. First-party cookies are set by Unoideo.
        <br />
        4. Third-party cookies are set by a third party, i.e. an authorized
        service provider of Unoideo.
      </Typography>

      <br />
      <br />

      <Typography variant="h6" className={styles.title} gutterBottom>
        2. Unoideo use of cookies
      </Typography>

      <Typography variant="body1" gutterBottom className={styles.description}>
        As we update and improve our services the specific cookies we use may
        change from time to time, but they will generally fall into one of the
        below categories:
      </Typography>
      <br />
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="body1" className={styles.description}>
                <b>Categories of Use</b>
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" className={styles.description}>
                <b>Description</b>
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="body1" className={styles.description}>
                Authentication
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" className={styles.description}>
                If you're signed in to Unoideo, cookies help us show you the
                right information and personalize your experience.
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1" className={styles.description}>
                Security
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" className={styles.description}>
                We use cookies to enable and support our security features such
                as identifying irregular site behavior, prevent fraudulent
                activity and improve security and violations of our Terms of
                Service.
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">
                Preferences, features and services
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" className={styles.description}>
                These cookies can tell us which language you prefer and what
                your communications preferences are and store such preferences
                and other information. They can also help you fill out forms on
                the Unoideo service more easily.
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1" className={styles.description}>
                Advertising
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" className={styles.description}>
                We may use first-party or third-party cookies and web beacons to
                deliver content, including ads relevant to your interests, on
                our sites or on third party sites. This includes using
                technologies to understand the usefulness to you of the
                advertisements and content that has been delivered to you, such
                as whether you have clicked on an advertisement.
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">
                Performance, Analytics and Research
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" className={styles.description}>
                Cookies help us learn how well our site, services and tools
                perform in different locations. We also use cookies to
                understand, improve, and research products, features, and
                services, including when you access Unoideo from other websites,
                applications, or devices such as your work computer or your
                mobile device.
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br />
      <br />
      <Typography variant="h6" className={styles.title} gutterBottom>
        3. Third party use of cookies
      </Typography>

      <Typography variant="body1" gutterBottom className={styles.description}>
        We may work with third-party companies, commonly known as service
        providers, who are authorized to place third-party cookies for storing
        information on our sites or in our services, applications, and tools
        with our permission. These service providers help us deliver our own
        content and advertising, and compile anonymous site metrics and
        analytics and to provide you with a better, faster, and safer
        experience.
        <br />
        We may also use third parties, such as advertising networks and
        exchanges, to allow us to serve you advertisements. These third-party ad
        networks and exchange providers may use third-party cookies to collect
        information. They may also collect your device identifier, IP address,
        or identifier for advertising. The information that these third parties
        collect may be used to assist us in providing you with more relevant
        advertising that we serve on our sites or elsewhere on the web.
        Third-party cookies are covered by the third parties' privacy policy.
        <br />
        These service providers are subject to confidentiality agreements with
        us and other legal restrictions on their use or collection of any
        personal information. Third-party cookies are covered by the third
        parties' privacy policy.
      </Typography>
      <br />
      <br />

      <Typography variant="h6" className={styles.title} gutterBottom>
        4. Your cookie options
      </Typography>

      <Typography variant="body1" gutterBottom className={styles.description}>
        Most browsers allow you to control cookies through their settings
        preferences. However, if you limit the ability of websites to set
        cookies, you may limit your user experience as it may stop you from
        saving customized settings like login information and other personalized
        preferences. Please note that opting out will not remove advertising
        from the pages you visit; it will mean that the ads you see may not be
        matched to your interests. In addition most browsers also provide
        functionality that lets you review and erase cookies, including Unoideo
        cookies. Please note that some Unoideo functionality may stop working
        properly without cookies.
      </Typography>
    </div>
  );
};

export default CookiePolicy;
