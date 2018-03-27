from stellar_base.utils import StellarMnemonic
from stellar_base.keypair import Keypair
from stellar_base.address import Address
import requests
import sys

FRIENDBOT = "https://friendbot.stellar.org/?addr="

# Generate key pair
def generate_key(lang="english", replicas=1, rand=False):
    if rand:
      kp = Keypair.random()
    else:
      sm = StellarMnemonic(lang)
      pubsList = []
      seedsList = []
      print("Save this mnemonic:")
      mnemonic = sm.generate()
      print(mnemonic)
      pubsFile = open("pubs.txt", "w")
      seedsFile = open("seeds.txt", "w")
      seedsFile.write("SEED PHRASE:\n") 
      seedsFile.write(mnemonic) 
      seedsFile.write("\n") 
      for i in range(replicas):
        kp = Keypair.deterministic(mnemonic, lang=lang, index=i)
        pub = kp.address().decode()
        seed = kp.seed().decode()
        pubsFile.write("PUBLIC KEY " + str(i + 1) + ":\n")
        pubsList.append(pub)
        pubsFile.write(pub)
        seedsFile.write("\n") 
        seedsFile.write("ENCODED SEED " + str(i + 1) + ":\n")
        seedsList.append(seed)
        seedsFile.write(seed)
        seedsFile.write("\n") 
      pubsFile.close()
      seedsFile.close()
      print("Your public keys can be found in 'pubs.txt'. These are your account addresses, which may be sent to those who wish to send you a transaction.")
      print("Your seeds can be found in 'seeds.txt'. IMPORTANT: Your seeds are your personal secret, which must never be shared with others. Never send these over the internet. If you ever need to restore a public key, you may do so with a seed. Follow instructions in your home screen.")
      return (pubsList, seedsList)

# Restore key pair from seed
def restore_key_from_seed(seed):
    print("Restoring key pair from seed...")
    pubsFile = open("pubs.txt", "w")
    seedsFile = open("seeds.txt", "w")
    kp = Keypair.from_seed(seed)
    pub = kp.address().decode()
    seed = kp.seed().decode()
    pubsFile.write("PUBLIC KEY:\n")
    pubsFile.write(pub)
    seedsFile.write("\n") 
    seedsFile.write("ENCODED SEED:\n")
    seedsFile.write(seed)
    seedsFile.write("\n") 
    pubsFile.close()
    seedsFile.close()
    print("Your public keys can be found in 'pubs.txt'. These are your account addresses, which may be sent to those who wish to send you a transaction.")
    print("Your seeds can be found in 'seeds.txt'. IMPORTANT: Your seeds are your personal secret, which must never be shared with others. Never send these over the internet. If you ever need to restore a public key, you may do so with a seed. Follow instructions in your home screen.")


# Restore key pair from seed phrase
def restore_key_from_seed_phrase(seedPhrase, lang="english"):
    print("Restoring key pair from seed phrase...")
    pubsFile = open("pubs.txt", "w")
    seedsFile = open("seeds.txt", "w")
    kp = Keypair.deterministic(seedPhrase, lang=lang)
    pub = kp.address().decode()
    seed = kp.seed().decode()
    pubsFile.write("PUBLIC KEY:\n")
    pubsFile.write(pub)
    seedsFile.write("\n") 
    seedsFile.write("ENCODED SEED:\n")
    seedsFile.write(seed)
    seedsFile.write("\n") 
    pubsFile.close()
    seedsFile.close()
    print("Your public keys can be found in 'pubs.txt'. These are your account addresses, which may be sent to those who wish to send you a transaction.")
    print("Your seeds can be found in 'seeds.txt'. IMPORTANT: Your seeds are your personal secret, which must never be shared with others. Never send these over the internet. If you ever need to restore a public key, you may do so with a seed. Follow instructions in your home screen.")


# Create account
def create_account(test=True):
    # Testnet account creation
    if test:
      (pubs, seeds) = generate_key()
      pub = pubs[0]
      req = requests.get(FRIENDBOT + pub)
      print(req.text)
    else:
      #TODO: See Python SDK for Livenet instructions
      pass

# Get basic acount information
def get_account_info(pub, verbose=False):
    addr = Address(address=pub) # TODO: addr = Address(address=pub,network='public') for Livenet
    addr.get()
    print("Balances: {}".format(addr.balances))
    print("Sequence Number: {}".format(addr.sequence))
    print("Flags: {}".format(addr.flags))
    print("Signers: {}".format(addr.signers))
    print("Data: {}".format(addr.data))

    # Extra account information
    if verbose:
      print("Payments: {}".format(addr.payments()))
      print("Transactions: {}".format(addr.transactions()))
      print("Effects: {}".format(addr.effects()))
      print("Offers: {}".format(addr.offers()))
      print("Operations: {}".format(addr.operations()))

# create_account()
get_account_info("GDOU3FOGRNVIFYLZNSIOUPSIJ3JDRHQJ6SHTWIDLLV3E5YNHZ3HP34MU") # First testnet account
get_account_info("GBNYOEP6Q7ZLNCN5ZVYPG3FHP4SQXPZIMTD7XKFY2CSJ2HWMRMXJY4XG") # Second testnet account
get_account_info("GDU3EAO3BRHI74WGRPKXM4U6AYJKNX75CFIGZFNQBHEP5LDIP3LGOXDQ") # Third testnet account
