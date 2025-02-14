'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import { IoBus, IoFastFood } from 'react-icons/io5';
import { GiPayMoney } from 'react-icons/gi';
import { useRouter } from 'next/navigation';

const MomoTransfer = () => {
  const router = useRouter();

  const reasons = useMemo(
    () => [
      {
        icon: <IoBus size={24} />,
        name: 'Transport',
      },
      {
        icon: <IoFastFood size={24} />,
        name: 'Food & drinks',
      },
      {
        icon: <GiPayMoney size={24} />,
        name: 'Miscallenous',
      },
    ],
    []
  );

  const maxPage = 3;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [ussd, setUssd] = useState('*182*');
  const [isNew, setIsNew] = useState(false);
  const [reason, setReason] = useState('');
  const [receipient, setReceipient] = useState('');
  const [receipientObj, setReceipientObj] = useState<IContact>();
  const [receipientName, setReceipientName] = useState('');
  const [amount, setAmount] = useState(0.0);
  const [addNewContact, setAddNewContact] = useState(false);
  const [allowNext, setAllowNext] = useState(false);
  const [recentContacts, setRecentContacts] = useState<IContact[]>([]);
  const [filteredRecentContacts, setFilteredRecentContacts] =
    useState<IContact[]>(recentContacts);

  useEffect(() => {
    setFilteredRecentContacts(
      recentContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(search.toLowerCase()) ||
          contact.phone.includes(search)
      )
    );
  }, [recentContacts, search]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('maL_contacts') ?? '[]');
    setRecentContacts((prev) => (stored.length > 0 ? stored : prev));
  }, []);

  function handleTransactionSave() {
    if (isNew && receipientObj?.name !== 'unkown') {
      const savedContacts = JSON.parse(
        localStorage.getItem('maL_contacts') ?? '[]'
      );
      savedContacts.push(receipientObj);
      localStorage.setItem('maL_contacts', JSON.stringify(savedContacts));
    }

    if (reason != '') {
      const saved = JSON.parse(
        localStorage.getItem('maL_transactions') ?? '[]'
      );
      const money = +amount;
      const charges = money <= 1000 ? 20 
        : money <= 5000? 100 
        : money <= 15000? 200 
        : money <= 30000? 300 
        : money <= 45000? 400 
        : money <= 60000? 500
        : money <= 75000? 600
        : money <= 100000? 700
        : money <= 150000? 800
        : money <= 300000? 1000
        : money <= 500000? 1500
        : money <= 1000000? 2000
        : money <= 2000000? 3000
        : 0;
      saved.push({
        reason,
        date: new Date().toISOString(),
        receipient: receipientObj,
        amount: money,
        charges,
      });
      localStorage.setItem('maL_transactions', JSON.stringify(saved));
    }

    router.push('/dashboard/home');
  }
  return (
    <div>
      {page === 1 && (
        <div className='page1'>
          {(receipient.length <= 0 || addNewContact) && <div className='mb-6'>
            {receipient.length <= 0 && (
              <Button
                onClick={() => {
                  setAddNewContact((prev) => !prev);
                  setIsNew((prev) => !prev);
                }}
              >
                {!addNewContact ? 'Add new' : 'Cancel'}
              </Button>
            )}
            {addNewContact && (
              <div className='mt-2'>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                  <Label htmlFor='phone'>Phone</Label>
                  <Input
                    type='tel'
                    id='phone'
                    placeholder='078***'
                    value={receipient}
                    onChange={(e) => {
                      setReceipient(e.target.value.trim());
                      setAllowNext(true);
                      setReceipientObj({
                        name: 'unkown',
                        phone: e.target.value.trim(),
                        image: '',
                      });
                    }}
                  />
                </div>
              </div>
            )}
          </div>}
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Input
              type='text'
              id='search'
              placeholder='Search for contact'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ul className='grid w-full max-w-sm items-center gap-1.5'>
            {filteredRecentContacts.map((contact, i) => (
              <li key={contact.phone} className='flex flex-row gap-2'>
                <input
                  type='radio'
                  name='contact'
                  id={'contact-' + 1 + i}
                  value={contact.phone}
                  onChange={(e) => {
                    setReceipient(e.target.value);
                    setAllowNext(true);
                    setReceipientObj(contact);
                  }}
                />
                <label
                  className={'flex flex-row gap-4'}
                  htmlFor={'contact-' + 1 + i}
                >
                  <div>
                    <Image
                      src={
                        contact.image
                          ? contact.image
                          : `https://ui-avatars.com/api/?background=random&name=${contact.name.replaceAll(
                              ' ',
                              '+'
                            )}`
                      }
                      height={50}
                      width={50}
                      alt='contact-image'
                    />
                  </div>
                  <div className='grid gap-1.5'>
                    <p className='font-bold'>{contact.name}</p>
                    <p>{contact.phone}</p>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {page < maxPage && (
        <Button
          disabled={page <= 1}
          onClick={() => {
            setPage((prev) => prev - 1);
            setAllowNext(false);
            setReceipient('');
            setReceipientObj(() => undefined);
          }}
        >
          Prev
        </Button>
      )}
      {page < maxPage - 1 && (
        <Button
          disabled={page >= maxPage || !allowNext}
          onClick={() => {
            setAllowNext(false);
            setPage((prev) => prev + 1);
            setUssd(`*182*${ussd.length >= 10 ? '1' : '8'}*1*${amount}#`);
          }}
        >
          Next
        </Button>
      )}

      {page === 2 && (
        <div className='page2'>
          {receipientObj && (
            <div className={'flex flex-row gap-4'}>
              <div>
                <Image
                  src={
                    receipientObj.image
                      ? receipientObj.image
                      : `https://ui-avatars.com/api/?background=random&name=${receipientObj.name.replaceAll(
                          ' ',
                          '+'
                        )}`
                  }
                  height={50}
                  width={50}
                  alt='receipientObj-image'
                />
              </div>
              <div className='grid gap-1.5'>
                <p className='font-bold'>{receipientObj.name}</p>
                <p>{receipientObj.phone}</p>
              </div>
            </div>
          )}
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='Amount'>Amount (rwf)</Label>
            <Input
              type='number'
              id='Amount'
              placeholder='0.00'
              value={amount}
              onChange={(e) => {
                setAmount(parseFloat(e.target.value));
                setAllowNext(true);
              }}
            />
          </div>
          <a href={`tel:${ussd}`} onClick={() => setPage((prev) => prev + 1)}>
            Send
          </a>
        </div>
      )}

      {page === 3 && (
        <div className='page3'>
          {isNew && (
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='recipientName'>Receipient Name</Label>
              <Input
                type='text'
                id='recipientName'
                placeholder='John Doe'
                value={receipientName}
                onChange={(e) => {
                  setReceipientName(e.target.value);
                  setReceipientObj({
                    image: "",
                    name: e.target.value,
                    phone: receipient,
                  });
                }}
              />
            </div>
          )}
          <ul>
            {reasons.map((contact, i) => (
              <li key={contact.name} className='flex flex-row gap-2'>
                <input
                  type='radio'
                  name='reason'
                  id={'reason-' + 1 + i}
                  value={contact.name}
                  onChange={(e) => {
                    setReason(e.target.value);
                    setAllowNext(true);
                  }}
                />
                <label
                  className={'flex flex-row gap-4'}
                  htmlFor={'reason-' + 1 + i}
                >
                  <div>{contact.icon}</div>
                  <div className='grid gap-1.5'>
                    <p className='font-bold'>{contact.name}</p>
                  </div>
                </label>
              </li>
            ))}
          </ul>
          <Button onClick={handleTransactionSave}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default MomoTransfer;
