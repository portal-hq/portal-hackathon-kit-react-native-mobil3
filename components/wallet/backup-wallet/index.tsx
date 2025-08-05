import { FC, useState } from 'react'
import { View } from 'react-native'
import PortalButton from '../../shared/button'
import PinModal from '../../shared/pin-modal'
import { styles } from '../../../style/stylesheet'
import { BackupMethods, usePortal } from '@portal-hq/core'
import React from 'react'

const BackupWallet: FC = () => {
  const portal = usePortal()

  const [backupDone, setBackupDone] = useState<boolean>(false)
  const [isBackingUp, setIsBackingUp] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [pin, setPin] = useState<string>('')

  const backupWallet = async () => {
    console.log(`Pin: ${pin}`)
    if (pin && pin.length === 4) {
      setIsBackingUp(true)
      setIsModalVisible(false)
      await portal?.backupWallet(BackupMethods.Password, () => {}, {
        passwordStorage: {
          password: pin,
        },
      })
      setBackupDone(true)
      setIsBackingUp(false)

      setTimeout(() => {
        setBackupDone(false)
      }, 2500)
    }
  }

  return (
    <>
      <View style={styles.section}>
        <PortalButton
          style={{
            backgroundColor: backupDone
              ? 'green'
              : isBackingUp
              ? 'gray'
              : 'black',
          }}
          title={
            backupDone
              ? 'Done'
              : isBackingUp
              ? 'In Progress...'
              : 'Backup Wallet'
          }
          onPress={() => {
            setIsModalVisible(true)
          }}
        />
      </View>

      {isModalVisible ? (
        <PinModal
          label="Backup"
          onSubmit={backupWallet}
          pinLength={4}
          setPin={setPin}
          setVisible={setIsModalVisible}
        />
      ) : null}
    </>
  )
}

export default BackupWallet
