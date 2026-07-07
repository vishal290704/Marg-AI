import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
    fontSize: 11,
    fontFamily: "Helvetica",
  },

  heading: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },

  section: {
    marginTop: 15,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 2,
  },

  text: {
    marginBottom: 4,
  },
});

const ResumePDF = ({
  user,
  contactInfo,
  summary,
  skills,
  experience,
  education,
  projects,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <Text style={styles.heading}>
          {user?.fullName || "Resume"}
        </Text>

       <View
  style={{
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 15,
    gap: 6,
  }}
>
  {contactInfo?.email && (
    <Text>{contactInfo.email}</Text>
  )}

  {contactInfo?.mobile && (
    <Text> | {contactInfo.mobile}</Text>
  )}

  {contactInfo?.linkedin && (
    <>
      <Text> | </Text>
      <Link src={contactInfo.linkedin}>LinkedIn</Link>
    </>
  )}

  {contactInfo?.twitter && (
    <>
      <Text> | </Text>
      <Link src={contactInfo.twitter}>Twitter</Link>
    </>
  )}
</View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Professional Summary
          </Text>

          <Text>{summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Skills
          </Text>

          <Text>{skills}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Experience
          </Text>

          {experience?.map((exp, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text>{exp.title}</Text>
              <Text>{exp.organization}</Text>
              <Text>
                {exp.startDate} -{" "}
                {exp.current ? "Present" : exp.endDate}
              </Text>
              <Text>{exp.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Education
          </Text>

          {education?.map((edu, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text>{edu.title}</Text>
              <Text>{edu.organization}</Text>
              <Text>
                {edu.startDate} - {edu.endDate}
              </Text>
              <Text>{edu.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Projects
          </Text>

          {projects?.map((project, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text>{project.title}</Text>
              <Text>{project.description}</Text>
            </View>
          ))}
        </View>

      </Page>
    </Document>
  );
};

export default ResumePDF;