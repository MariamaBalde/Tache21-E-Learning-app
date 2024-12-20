'use client'

import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../Config/firebaseConfig'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFDF7',
    position: 'relative',
  },
  border: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    border: '2pt solid #C4A484',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    backgroundColor: '#8B4513',
    transform: 'rotate(-45deg) translate(-50%, -50%)',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100,
    height: 100,
    backgroundColor: '#8B4513',
    transform: 'rotate(135deg) translate(50%, 50%)',
  },
  decorativeLine: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 80,
    height: 1,
    backgroundColor: '#C4A484',
  },
  header: {
    marginTop: 60,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    color: '#2C1810',
    fontFamily: 'Times-Roman',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#C4A484',
    fontFamily: 'Times-Roman',
    letterSpacing: 2,
  },
  recipientSection: {
    marginTop: 60,
    textAlign: 'center',
  },
  preRecipient: {
    fontSize: 14,
    color: '#2C1810',
    marginBottom: 20,
  },
  recipientName: {
    fontSize: 28,
    color: '#2C1810',
    fontFamily: 'Times-Roman',
    fontStyle: 'italic',
  },
  content: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 1.6,
    color: '#2C1810',
    padding: '0 40px',
  },
  laurelWrapper: {
    marginTop: 30,
    alignItems: 'center',
  },
  laurel: {
    width: 100,
    height: 100,
  },
  signatureSection: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
  },
  signature: {
    alignItems: 'center',
  },
  signatureLine: {
    width: 150,
    borderBottom: '1pt solid #2C1810',
    marginBottom: 5,
  },
  signatureName: {
    fontSize: 12,
    color: '#2C1810',
  },
  signatureTitle: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
})

const CertificationDocument = ({ studentName, courseName, certificationDate }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.border} />
      <View style={styles.cornerTopLeft} />
      <View style={styles.cornerBottomRight} />
      <View style={styles.decorativeLine} />
      
      <View style={styles.header}>
        <Text style={styles.title}>CERTIFICAT</Text>
        <Text style={styles.subtitle}>D'APPRÉCIATION</Text>
      </View>

      <View style={styles.recipientSection}>
        <Text style={styles.preRecipient}>LE PRÉSENT CERTIFICAT EST DÉCERNÉ À</Text>
        <Text style={styles.recipientName}>{studentName}</Text>
      </View>

      <View style={styles.content}>
        <Text>
          Ce certificat est attribué à {studentName} pour ses réalisations dans le cadre du cours 
          {courseName} et atteste de ses compétences dans ce domaine en tant que développeur web.
        </Text>
      </View>

      <View style={styles.laurelWrapper}>
        <Image 
          style={styles.laurel}
          src="/placeholder.svg?height=100&width=100"
        />
      </View>

      <View style={styles.signatureSection}>
        <View style={styles.signature}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureName}>Alfredo Torres</Text>
          <Text style={styles.signatureTitle}>Président du Conseil</Text>
        </View>
        <View style={styles.signature}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureName}>Adeline Palmerston</Text>
          <Text style={styles.signatureTitle}>Directrice</Text>
        </View>
      </View>
    </Page>
  </Document>
)

export default function Certification() {
  const [studentName, setStudentName] = useState('Mamadou Doucoure')
  const courseName = 'Développement Web'
  const certificationDate = new Date().toLocaleDateString('fr-FR')

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'students'))
        const studentData = querySnapshot.docs[0]?.data()
        if (studentData && studentData.name) {
          setStudentName(studentData.name)
        }
      } catch (error) {
        console.error('Error fetching student data:', error)
      }
    }

    fetchStudentData()
  }, [])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Aperçu du Certificat</h1>
      {studentName ? (
        <PDFViewer className="w-full h-[800px] rounded-lg shadow-lg">
          <CertificationDocument
            studentName={studentName}
            courseName={courseName}
            certificationDate={certificationDate}
          />
        </PDFViewer>
      ) : (
        <div className="flex items-center justify-center h-[800px] bg-white rounded-lg shadow-lg">
          <p className="text-gray-600">Chargement des données du certificat...</p>
        </div>
      )}
    </div>
  )
}
