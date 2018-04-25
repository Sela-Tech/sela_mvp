from stellar_base.builder import Builder

SRC_SEED = "SBRIK7R6UYBIOB7PUGYZ5GYIGJBENR7RZ2HGUNHGA35QPVBK2KHS6L6L"
TGT_ADDR = "GBNYOEP6Q7ZLNCN5ZVYPG3FHP4SQXPZIMTD7XKFY2CSJ2HWMRMXJY4XG"

def send_payment(sourceSeed, targetAddr, amount, asset, memoText="It's payday at Sela!"):
    builder = Builder(secret=sourceSeed)
    builder.append_payment_op(targetAddr, amount, asset)
    builder.add_text_memo(memoText)
    builder.sign()
    builder.submit()

send_payment(SRC_SEED, TGT_ADDR, "100", "XLM")
