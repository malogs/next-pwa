import MomoTransfer from '@/components/MomoTransfer';

// interface IContact {
//   name: string;
//   email: string;
//   tel: string;
// }

const Teansact = () => {
  // const [contacts, setContacts] = useState<IContact[]>([]);
  // useEffect(() => {
  //   (async () => {
  //     if (!navigator.contacts || !navigator.contacts.select) {
  //       console.log('Contact Picker API not supported in this browser.');
  //       return;
  //     }

  //     try {
  //       const phonebook = await navigator.contacts.select(
  //         ['name', 'email', 'tel'],
  //         { multiple: true }
  //       );
  //       setContacts(phonebook);
  //     } catch (error) {
  //       console.error('Error picking contacts:', error);
  //     }
  //   })();
  // }, []);

  return (
    <div>
      <div className='mb-4'>
        <p className="text-2xl text-center ">Transact</p>
      </div>
      <MomoTransfer />
    </div>
  );
};

export default Teansact;
